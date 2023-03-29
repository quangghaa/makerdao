export const elipsisAddress = (add: string) => {
    if(add.length < 0 || add.length > 64) {
        console.log("Not eth address")
        return 
    }

    return add.slice(0, 6) + '...' + add.slice(add.length - 4);
} 