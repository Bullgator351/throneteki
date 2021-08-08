const GameAction = require('./GameAction');
const MoveCardEventGenerator = require('./MoveCardEventGenerator');

class LeavePlay extends GameAction {
    constructor() {
        super('leavePlay');
    }

    canChangeGameState({ card }) {
        return ['active plot', 'faction', 'play area', 'title'].includes(card.location);
    }

    createEvent({ card, allowSave = false }) {
        return MoveCardEventGenerator.createLeavePlayEvent({ card, allowSave });
    }
}

module.exports = new LeavePlay();
