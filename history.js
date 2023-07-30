

class AbstractHistory {

  constructor() {
    if (this.constructor === AbstractHistory) {
      throw new Error('It is an abstract class');
    }
  }

  getHistory() {
    throw new Error('Abstract method not implemented');
  }

  addItem() {
    throw new Error('Abstract method not implemented');
  }

  clearHistory() {
    throw new Error('Abstract method not implemented');
  }

  getTodayStats() {
    throw new Error('Abstract method not implemented');
  }
}

class CookieHistory extends AbstractHistory {

  // Return example [{emotion: 'sad', date: 16234251235}, {emotion: 'angry', date: 16234251335}]
  getHistoryList() {
    let cookies = this.getHistoryCookies();

    let result = cookies.map((elem) => {
      let parsedDate = Number(elem.split('=')[0]);

      return {
        emotion: elem.split('=')[1],
        date: timeSince(new Date(parsedDate))
        }
      }
    );

    return result;
  }

  addItem(emotion, date=null) {

    if (date === null){
      date = Date.now();
    }

    document.cookie = `history:${date}=${emotion}`;
  }

  clearHistory() {
    let cookies = this.getHistoryCookies();

    for (let cookie of cookies) {
      console.log(cookie);
      let name = cookie.split('=')[0];
      this.deleteCookie(name);
    }
  }

  getTodayStats() {
    let cookies = this.getHistoryCookies();

    let stats = {
      angry: 0,
      disgusted: 0,
      fearful: 0,
      happy: 0,
      sad: 0,
      surprised: 0,
    };

    for (let item of cookies) {
      let itemDate = Number(item.split('=')[0]);
      let itemValue = item.split('=')[1];

      if ((Date.now() - itemDate) < 86400){
        stats[itemValue] += 1;
      }
    }
    return stats;
  }

  // Return example [16234251235=sad, 16234251231=happy, 16234251237=angry]
  prepareCookies(cookiesString) {
    let cookieList = cookiesString.split('; ');

    let filtered = cookieList.filter(elem => {
        if (elem.split(':')[0] === 'history') return true;
      });
    let prepared = filtered.map((elem) => {
        return elem.replace('history:', '');
      })
    return prepared;
  }

  getHistoryCookies() {
    return this.prepareCookies(document.cookie);
  }

  deleteCookie(date) {
    document.cookie = 'history:'+ date +'=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  //
  // Copy example cookies from cookies.txt
  // Print 'history.loadCookies(*cookies*)' in developer console
  //
  loadCookies(cookiesString) {
    let prepared = this.prepareCookies(cookiesString);
    for (let cookie of prepared) {
      this.addItem(cookie.split('=')[1], Number(cookie.split('=')[0]));
    }
  }
}


function timeSince(date) {

  let seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " min";
  }
  return Math.floor(seconds) + " sec";
}
