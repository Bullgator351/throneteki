import { FactionCostReducer } from '../reducer.js';

class HeartTreeGrove extends FactionCostReducer {
    constructor(owner, cardData) {
        super(owner, cardData, 1, 'stark');
    }
}

HeartTreeGrove.code = '01156';

export default HeartTreeGrove;
