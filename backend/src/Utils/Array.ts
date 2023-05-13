const Contains = <T>(item: T, array: T[]): boolean => !!array.find(element => JSON.stringify(element) === JSON.stringify(item));

export { Contains };
