import DrawCard from '../../drawcard.js';

class SerLancelLannister extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () => this.getSingleOtherLannisterLordOrLady(),
            match: this,
            effect: ability.effects.dynamicStrength(() =>
                this.getSingleOtherLannisterLordOrLady().getStrength()
            )
        });
    }

    getSingleOtherLannisterLordOrLady() {
        let cards = this.controller.filterCardsInPlay((card) => {
            return (
                card.isFaction('lannister') &&
                (card.hasTrait('Lord') || card.hasTrait('Lady')) &&
                card.getType() === 'character' &&
                card !== this
            );
        });

        if (cards.length === 1) {
            return cards[0];
        }

        return;
    }
}

SerLancelLannister.code = '05014';

export default SerLancelLannister;
