import Costs from '../../../server/game/costs.js';

describe('Costs.payReduceableGoldCost', function () {
    beforeEach(function () {
        this.gameSpy = jasmine.createSpyObj('game', ['addMessage', 'spendGold']);
        this.playerSpy = jasmine.createSpyObj('player', [
            'getDuplicateInPlay',
            'getReducedCost',
            'getSpendableGold',
            'markUsedReducers'
        ]);
        this.cardSpy = { card: 1 };
        this.context = {
            costs: {},
            game: this.gameSpy,
            player: this.playerSpy,
            source: this.cardSpy
        };
        this.cost = Costs.payReduceableGoldCost('playing-type');
    });

    describe('canPay()', function () {
        beforeEach(function () {
            this.playerSpy.getSpendableGold.and.returnValue(6);
            this.playerSpy.getReducedCost.and.returnValue(4);
        });

        it('should check that the player can spend the amount of gold', function () {
            this.cost.canPay(this.context);
            expect(this.playerSpy.getSpendableGold).toHaveBeenCalledWith(
                jasmine.objectContaining({ playingType: 'playing-type' })
            );
        });

        it('should return true when all criteria are met', function () {
            expect(this.cost.canPay(this.context)).toBe(true);
        });

        it('should check the cost properly', function () {
            this.cost.canPay(this.context);
            expect(this.playerSpy.getReducedCost).toHaveBeenCalledWith(
                'playing-type',
                this.cardSpy
            );
        });

        describe('when there is a duplicate in play', function () {
            beforeEach(function () {
                this.playerSpy.getDuplicateInPlay.and.returnValue({});
            });

            describe('and the play type is marshal', function () {
                beforeEach(function () {
                    this.cost = Costs.payReduceableGoldCost('marshal');
                });

                it('should return true regardless of gold', function () {
                    this.playerSpy.getSpendableGold.and.returnValue(0);
                    expect(this.cost.canPay(this.context)).toBe(true);
                });
            });

            describe('and the play type is not marshal', function () {
                beforeEach(function () {
                    this.cost = Costs.payReduceableGoldCost('ambush');
                });

                it('should return true if there is enough gold gold', function () {
                    this.playerSpy.getSpendableGold.and.returnValue(6);
                    expect(this.cost.canPay(this.context)).toBe(true);
                });

                it('should return false if there is not enough gold gold', function () {
                    this.playerSpy.getSpendableGold.and.returnValue(3);
                    expect(this.cost.canPay(this.context)).toBe(false);
                });
            });
        });

        describe('when there is not enough gold', function () {
            beforeEach(function () {
                this.playerSpy.getSpendableGold.and.returnValue(3);
            });

            it('should return false', function () {
                expect(this.cost.canPay(this.context)).toBe(false);
            });
        });
    });

    describe('pay()', function () {
        beforeEach(function () {
            this.playerSpy.getSpendableGold.and.returnValue(6);
            this.playerSpy.getReducedCost.and.returnValue(3);
        });

        describe('when there is no duplicate in play', function () {
            beforeEach(function () {
                this.cost.pay(this.context);
            });

            it('should mark the gold cost as the reduced cost', function () {
                expect(this.context.costs.gold).toBe(3);
            });

            it('should mark the cost as not a duplicate', function () {
                expect(this.context.costs.isDupe).toBe(false);
            });

            it('should spend the players gold', function () {
                expect(this.gameSpy.spendGold).toHaveBeenCalledWith(
                    jasmine.objectContaining({ amount: 3, playingType: 'playing-type' })
                );
            });

            it('should mark any reducers as used', function () {
                expect(this.playerSpy.markUsedReducers).toHaveBeenCalledWith(
                    'playing-type',
                    this.cardSpy
                );
            });
        });

        describe('when there is a duplicate in play', function () {
            beforeEach(function () {
                this.playerSpy.getDuplicateInPlay.and.returnValue({});
            });

            describe('and the play type is marshal', function () {
                beforeEach(function () {
                    this.cost = Costs.payReduceableGoldCost('marshal');
                    this.cost.pay(this.context);
                });

                it('should mark the gold cost as 0', function () {
                    expect(this.context.costs.gold).toBe(0);
                });

                it('should mark the cost as a duplicate', function () {
                    expect(this.context.costs.isDupe).toBe(true);
                });

                it('should not spend the players gold', function () {
                    expect(this.gameSpy.spendGold).not.toHaveBeenCalled();
                });

                it('should not mark any reducers as used', function () {
                    expect(this.playerSpy.markUsedReducers).not.toHaveBeenCalled();
                });
            });

            describe('and the play type is not marshal', function () {
                beforeEach(function () {
                    this.cost = Costs.payReduceableGoldCost('ambush');
                    this.cost.pay(this.context);
                });

                it('should mark the gold cost as the reduced cost', function () {
                    expect(this.context.costs.gold).toBe(3);
                });

                it('should mark the cost as a duplicate', function () {
                    expect(this.context.costs.isDupe).toBe(true);
                });

                it('should spend the players gold', function () {
                    expect(this.gameSpy.spendGold).toHaveBeenCalledWith(
                        jasmine.objectContaining({ amount: 3, playingType: 'ambush' })
                    );
                });

                it('should mark any reducers as used', function () {
                    expect(this.playerSpy.markUsedReducers).toHaveBeenCalledWith(
                        'ambush',
                        this.cardSpy
                    );
                });
            });
        });
    });
});
