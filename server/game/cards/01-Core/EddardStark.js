import DrawCard from '../../drawcard.js';

class EddardStark extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onChallengeInitiated: (event) =>
                    event.challenge.initiatedAgainstPlayer === this.controller && this.kneeled
            },
            handler: () => {
                this.controller.standCard(this);

                this.game.addMessage('{0} uses {1} to stand {1}', this.controller, this);
            }
        });
    }
}

EddardStark.code = '01144';

export default EddardStark;
