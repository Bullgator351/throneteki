import DrawCard from '../../drawcard.js';

class TaenaMerryweather extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onCardPlayed: (event) =>
                    event.card.getType() === 'event' &&
                    event.card.controller === this.controller &&
                    this.controller.canDraw()
            },
            cost: ability.costs.discardFromHand(),
            handler: (context) => {
                this.controller.drawCardsToHand(1);
                this.game.addMessage(
                    '{0} uses {1} and discards {2} from their hand to draw 1 card',
                    this.controller,
                    this,
                    context.costs.discardFromHand
                );
            }
        });
    }
}

TaenaMerryweather.code = '05010';

export default TaenaMerryweather;
