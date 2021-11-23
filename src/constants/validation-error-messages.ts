export const ErrorMessages: ErrorMessage = {
  title: 'Please Provide a valid product title',
  price: 'Minimum value for field Price must be 100',
  discount: 'Please enter only numbers 0 - 99',
  material: 'Please select a value for Material',
  brand: 'Please select a value for Brand',
  category: 'Please select a value for Category',
  pattern: 'Please select a value for Pattern',
  gender: 'Please select a value for Pattern',
  sizes: 'Please select atleast one Size',
  colors: 'Please select atleast one Color',
  quantity: 'Please enter valid quantity',
  sku: 'Please enter a valid value for SKU',
  images: 'Please select atleast one image',
  description: 'Please enter valid Description',
  fit: 'Please enter valid value for Fit',
  composition: 'Please enter valid value for Composition',
  care: 'Please enter valid value for Care',
  expressDeliveryCharges: 'Please enter only numbers 0 - 99',
  sizeChart: 'Please select a image for Size Chart',
  generic: 'Please enter valid value',
  pincode: 'Please enter valid zip',
  phone: 'Please enter valid phone',
  chestLength: 'Please enter valid Chest Length',
  waistLength: 'Please enter valid Waist Length',
  hipLength: 'Please enter valid Hip Length',
  shoulderWidth: 'Please enter valid Shoulder Width',
  lowerWaist: 'Please enter valid Lower waist',
  neckRound: 'Please enter valid Neck Round',
};

type ErrorMessage = {
  [key: string]: string;
};
