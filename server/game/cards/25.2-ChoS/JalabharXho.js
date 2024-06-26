import GameActions from '../../GameActions/index.js';
import DrawCard from '../../drawcard.js';

class JalabharXho extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Take control of Jalabhar Xho',
            phase: 'marshal',
            anyPlayer: true,
            cost: ability.costs.discardFactionPower(1),
            message:
                '{player} discards 1 power from their faction card to take control of {source}',
            gameAction: GameActions.takeControl((context) => ({
                player: context.player,
                card: this,
                context
            }))
        });
    }
}

JalabharXho.code = '25037';

export default JalabharXho;
