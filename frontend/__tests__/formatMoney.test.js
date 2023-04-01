import formatMoney from '../lib/formatMoney';

describe('format money function', () => {
  it('works with fractional dollars', () => {
    expect(formatMoney(1)).toEqual('$0.01');
    expect(formatMoney(5)).toEqual('$0.05');
    expect(formatMoney(46)).toEqual('$0.46');
    expect(formatMoney(0)).toEqual('$0');
  });
  it('works with whole dollars', () => {
    expect(formatMoney(100)).toEqual('$1');
    expect(formatMoney(4500)).toEqual('$45');
    expect(formatMoney(19900)).toEqual('$199');
    expect(formatMoney()).toEqual('$0');
  });
  it('works with fractional and whole dollars', () => {
    expect(formatMoney(142)).toEqual('$1.42');
    expect(formatMoney(5082)).toEqual('$50.82');
    expect(formatMoney(162)).toEqual('$1.62');
    expect(formatMoney(103)).toEqual('$1.03');
    expect(formatMoney(87698745345399)).toEqual('$876,987,453,453.99');
  });
});
