import DrawCard from '../../drawcard.js';

class VanguardLeader extends DrawCard {
    setupCardAbilities(ability) {
        this.attachmentRestriction({ unique: true });
        this.whileAttached({
            effect: [ability.effects.addTrait('Commander'), ability.effects.modifyStrength(1)]
        });
    }
}

VanguardLeader.code = '24027';

export default VanguardLeader;
