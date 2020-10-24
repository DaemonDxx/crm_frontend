export function UserFIOFilter (value) {
    if (value.lastName) {
        return `${value.lastName} ${value.firstName.split('')[0]}. ${value.thirdName.split('')[0]}.`
    }
}

