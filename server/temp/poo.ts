
interface Dog {
	_type: "Dog"
	legs: number
	hasTail: boolean
	name: string
}

interface Cat {
	_type: "Cat"
	legs: number
	hasTail: boolean
	name: string
}

const dogToCat = (dog: Dog): Cat => {return {
    _type: "Cat",
    legs:4,
    hasTail: true,
    name: dog.name
}
}
