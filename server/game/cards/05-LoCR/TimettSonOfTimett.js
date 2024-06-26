import DrawCard from '../../drawcard.js';

class TimettSonOfTimett extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                afterChallenge: (event) =>
                    event.challenge.winner === this.controller && this.isAttacking()
            },
            target: {
                activePromptTitle: 'Select character to kill',
                cardCondition: (card) =>
                    card.location === 'play area' &&
                    card.getType() === 'character' &&
                    card.getPrintedCost() <= this.getNumberOfClansmen(),
                gameAction: 'kill'
            },
            handler: (context) => {
                context.target.controller.killCharacter(context.target);
                this.game.addMessage(
                    '{0} uses {1} to kill {2}',
                    context.player,
                    this,
                    context.target
                );
            }
        });
    }

    getNumberOfClansmen() {
        let cards = this.controller.filterCardsInPlay((card) => {
            return card.hasTrait('Clansman') && card.getType() === 'character';
        });

        return cards.length;
    }
}

TimettSonOfTimett.code = '05004';

export default TimettSonOfTimett;
