import DrawCard from '../../drawcard.js';

class SwornBrother extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            targetController: 'current',
            effect: ability.effects.reduceFirstMarshalledCardCostEachRound(
                1,
                (card) => card.getType() === 'location'
            )
        });
    }
}

SwornBrother.code = '02105';

export default SwornBrother;
