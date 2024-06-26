import GameActions from '../../GameActions/index.js';
import DrawCard from '../../drawcard.js';

class HighgardenTreasury extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onRemovedFromChallenge: (event) => event.card.location === 'play area'
            },
            limit: ability.limit.perRound(3),
            message: '{player} uses {source} to gain 1 gold',
            gameAction: GameActions.gainGold({ player: this.controller, amount: 1 })
        });
    }
}

HighgardenTreasury.code = '25016';

export default HighgardenTreasury;
