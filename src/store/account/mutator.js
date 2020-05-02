
export default class Mutator {
	static setState(oldState, newState) {
		return {
			...oldState,
			...newState && newState.newState
				? newState.newState
				: newState
		}
	}
}
