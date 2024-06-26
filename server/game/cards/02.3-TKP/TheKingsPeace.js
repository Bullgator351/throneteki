import PlotCard from '../../plotcard.js';

class TheKingsPeace extends PlotCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onChallengeInitiated: (event) =>
                    event.challenge.initiatedAgainstPlayer === this.controller &&
                    (event.challenge.initiatedChallengeType === 'military' ||
                        event.challenge.initiatedChallengeType === 'power')
            },
            handler: () => {
                let otherPlayer = this.game.currentChallenge.attackingPlayer;
                let buttons = [];

                if (!otherPlayer.faction.kneeled) {
                    buttons.push({ text: 'Kneel faction card', method: 'kneel' });
                }

                if (otherPlayer.faction.power >= 1) {
                    buttons.push({ text: 'Move 1 power', method: 'movePower' });
                }

                if (buttons.length === 0) {
                    this.cancelChallenge(otherPlayer);

                    return true;
                }

                buttons.push({ text: 'Cancel Challenge', method: 'cancelChallenge' });

                this.game.promptWithMenu(otherPlayer, this, {
                    activePrompt: {
                        menuTitle: 'Select choice for ' + this.name,
                        buttons: buttons
                    },
                    waitingPromptTitle: 'Waiting for opponent to choose'
                });

                this.game.addMessage(
                    "{0} uses {1} to force {2} to kneel their faction card, move 1 power to {0}'s faction card or cancel the challenge",
                    this.controller,
                    this,
                    otherPlayer
                );

                return true;
            }
        });
    }

    kneel(player) {
        player.kneelCard(player.faction);

        this.game.addMessage(
            '{0} chooses to kneel their faction card to let the challenge continue',
            player
        );

        return true;
    }

    movePower(player) {
        this.game.movePower(player.faction, this.controller.faction, 1);

        this.game.addMessage(
            '{0} chooses to transfer 1 power to {1} to let the challenge continue',
            player,
            this.controller
        );

        return true;
    }

    cancelChallenge() {
        this.game.currentChallenge.cancelChallenge();

        this.game.addMessage('{0} uses {1} to cancel the current challenge', this.controller, this);

        return true;
    }
}

TheKingsPeace.code = '02048';

export default TheKingsPeace;
