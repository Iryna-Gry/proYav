const video = document.getElementById("video");
const emojiContainer = document.getElementById("emojiContainer"); // Emoji container

const emojiMap = {
  neutral: "😐",
  happy: "😄",
  sad: "😢",
  angry: "😠",
  surprised: "😲",
  disgusted: "🤢",
  fearful: "😨",
};

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("/team-16-front-react/models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/team-16-front-react/models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("/team-16-front-react/models"),
  faceapi.nets.faceExpressionNet.loadFromUri("/team-16-front-react/models"),
  faceapi.nets.ssdMobilenetv1.loadFromUri("/team-16-front-react/models"),
]).then(startVideo);

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    (stream) => (video.srcObject = stream),
    (err) => console.error(err)
  );
  try {
    navigator.mediaDevices
      .getUserMedia({ video: {} })
      .then((stream) => {
        video.srcObject = stream;
      })
      .catch((err) => console.error("Error accessing the camera: ", err));
  } catch {
    console.error("getUserMedia is not available");
  }
}

async function getCurrentEmotion(video) {
  let expressions = (
    await faceapi.detectSingleFace(video).withFaceExpressions()
  ).expressions;
  let resultExpression = "neutral";

  // Get the most possible emotion
  for (let key in expressions) {
    let value = expressions[key];

    if (value > expressions[resultExpression]) {
      resultExpression = key;
    }
  }
  return resultExpression;
}

video.addEventListener("play", () => {
  const canvas = faceapi.createCanvasFromMedia(video);
  const videoContainer = document.getElementById("video-container");
  videoContainer.append(canvas);
  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);
  setInterval(async () => {
    let emotion = await getCurrentEmotion(video);

    // Выводим эмодзи, если обнаружено не нейтральное выражение
    if (emotion !== "neutral") {
      emojiContainer.innerHTML = emojiMap[emotion];
    } else {
      emojiContainer.innerHTML = "";
    }
  }, 100);
});
