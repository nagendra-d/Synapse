const sleep = async (ms: number) => {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, ms);
    });
}

export default sleep;
