class TChildControl {
  static validate(child, parentType, childType) {
    if (process.env.NODE_ENV === 'production') {
      return true;
    }
    if (child.type.name !== childType)
      throw new TypeError(parentType + ' can only contains ' + childType + ' child');
  }
}

export default TChildControl;
