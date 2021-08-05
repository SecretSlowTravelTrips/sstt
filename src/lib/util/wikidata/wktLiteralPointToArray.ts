export default (point: string): number[] => {
  return point.replace('Point(', '').replace(')', '').split(' ').map(Number);
};
