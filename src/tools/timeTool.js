function Time(){
  return (time) => {
    // msgTime函数的逻辑
    const now = new Date();
    const timeStamp = new Date(time);
    const timeDiff = now - timeStamp;
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0); // 今天的0点

    if (timeDiff < 24 * 60 * 60 * 1000) {
      if(timeStamp<startOfDay){
        const hours = timeStamp.getHours();
        const minutes = timeStamp.getMinutes();
        return `${padZero(hours)}:${padZero(minutes)} YTD`;
      }else{
        const hours = timeStamp.getHours();
        const minutes = timeStamp.getMinutes();
        if(hours<=12){
          return `${padZero(hours)}:${padZero(minutes)} AM`;
        }else{
          return `${padZero(hours)}:${padZero(minutes)} PM`;
        }
      }
    } else if (timeDiff < 7 * 24 * 60 * 60 * 1000) {
      // const days = ['日', '一', '二', '三', '四', '五', '六'];
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayOfWeek = days[timeStamp.getDay()];
      return `${dayOfWeek}`;
    } else {
      const year = timeStamp.getFullYear();
      const month = timeStamp.getMonth() + 1;
      const date = timeStamp.getDate();
      return `${padZero(year)}/${padZero(month)}/${padZero(date)}`;
    }

    function padZero(value) {
    return value < 10 ? `0${value}` : value;
    }
  };
} 
export default Time;