import DrawCard from '../../drawcard.js';

class Dalla extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onCardEntersPlay: (event) =>
                    event.card.controller === this.controller &&
                    event.card.hasTrait('Wildling') &&
                    event.card.getType() === 'character' &&
                    this.controller.canDraw()
            },
            limit: ability.limit.perPhase(1),
            handler: () => {
                this.controller.drawCardsToHand(1);
                this.game.addMessage('{0} uses {1} to draw 1 card', this.controller, this);
            }
        });
    }
}

Dalla.code = '07040';

export default Dalla;
