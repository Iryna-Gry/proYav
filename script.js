const video = document.getElementById('video');
const emojiContainer = document.getElementById('emojiContainer'); // Emoji container
const historyContainer = document.getElementById('historyContainer'); // History container
const history = new CookieHistory();


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
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
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

  for (emotion of history.getItemList()) { // emotion = {name: 'sad', date: 1690661025999} 
    historyContainer.insertAdjacentHTML('afterbegin', `<p class='historyItem'>${emotion.emotion}<span class='historySpan'>${emotion.date}</span></p>`);
  }

  setInterval(async () => {
    let emotion = await getCurrentEmotion(video);
    let lastEmotion = historyContainer.querySelector('p:first-of-type')?.textContent ?? 'neutral';

    // Neutral emotion check
    if (emotion === 'neutral') {
      emojiContainer.innerHTML = '';
      return;

    }
 
    if (lastEmotion === emotion) {
      emojiContainer.innerHTML = emojiMap[emotion];
      return;
    }

    historyList = history.addItem(emotion);
    emojiContainer.innerHTML = emojiMap[emotion];
    historyContainer.insertAdjacentHTML('afterbegin', `<p class='historyItem'>${emotion}</p>`);
  }, 100);
});
