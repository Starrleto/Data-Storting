export {data};

const data = async () => {
    const promise = await fetch("../data/data.json");
    const stuff = await promise.json();
    return(stuff.People);
}

data();
