export function alerts(...alertTexts: string[]) {
  let i = 0;
  let time = Date.now();
  return (infinity = true) => {
    //一分
    if (time + 60000 < Date.now()) {
      i = 0;
    }
    time = Date.now();
    const text = alertTexts.at(i++);
    if (typeof text === "string") {
      alert(text);
    } else {
      if (infinity) {
        alert("......");
      }
    }
  };
}