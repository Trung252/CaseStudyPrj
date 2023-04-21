const showPrice = (price) => {
    let splitArray = [];
    while (true) {
        if (price >= 1000) {
            let splitString = "." + price.toString().slice(-3);
            splitArray.unshift(splitString);
            price = Math.floor(price / 1000);
        } else {
            splitArray.unshift(price.toString());
            break;
        }
    }
    const result = splitArray.join("") + "-VND";
    return result;
};

export default showPrice;