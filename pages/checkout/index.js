import React, { useEffect, useState } from 'react';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { CartContext } from '@/context/cart';
import { useContext } from 'react';
import Loading from '../admin/components/loading';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  const { getCartTotal } = useContext(CartContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    postalCode: '',
    shippingMethod: 'standard',
    paymentMethod: 'cod', // Default to Cash On Delivery
  });

  const [errors, setErrors] = useState({});

  const [cod, setCod] = useState(10);
  const [taxPercent, setTaxPercent] = useState(16);
  const [totalBill, setTotalBill] = useState(0);

  useEffect(() => {
    if (getCartTotal() > 0) {
      // Calculate tax amount
      const taxAmount = (getCartTotal() * taxPercent) / 100;
      // Calculate total bill including COD and tax
      const bill = getCartTotal() + cod + taxAmount;
      setTotalBill(bill);
    } else {
      // Reset total bill if cart is empty
      setTotalBill(0);
    }
  }, [getCartTotal, cod, taxPercent]);

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validation logic
    if (formData.firstName.trim() === '') {
      newErrors.firstName = true;
      valid = false;
    }

    if (formData.email.trim() === '') {
      newErrors.email = true;
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = true;
      valid = false;
    }

    if (formData.phone.trim() === '' || formData.phone.length > 13) {
      newErrors.phone = true;
      valid = false;
    }

    if (formData.country.trim() === '') {
      newErrors.country = true;
      valid = false;
    }

    if (formData.city.trim() === '') {
      newErrors.city = true;
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const form = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          city: formData.city,
          postalCode: formData.postalCode,
          paymentMethod: formData.paymentMethod,
          shippingMethod: formData.shippingMethod,
          totalAmount: totalBill
        }
        const response = await axios.post('/api/orders/submit', form);
        if(response.status === 200){

          const { trackingCode } = response.data;
          console.log('Order placed successfully. Tracking code:', trackingCode);
          router.push("/thank-you");
        }else if (response.status === 405){
          const { error } = response.data;
          console.log(error);
        }
      } catch (error) {
        console.error('Failed to place order:', error.message);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  return (
    <>
      <Loading />
      <Header />
      <div className="my-10 bg-white p-4">
        <div className="md:max-w-5xl max-w-xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-extrabold text-gray-800">Shipping Details</h2>
                <div className="grid gap-4 my-8">
                  <div className="flex gap-4 items-center justify-center">
                    <div className="w-1/2">
                      <input
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:outline-none ${errors.firstName ? 'border-red-500' : 'border'
                          }`}
                      />
                    </div>
                    <div className="w-1/2">
                      <input
                        type="text"
                        placeholder="Last Name (Optional)"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:outline-none"
                      />
                    </div>
                  </div>

                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:outline-none ${errors.email ? 'border-red-500' : 'border'
                      }`}
                  />

                  <input
                    type="tel"
                    placeholder="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:outline-none ${errors.phone ? 'border-red-500' : 'border'
                      }`}
                  />

                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:outline-none ${errors.country ? 'border-red-500' : 'border'
                      }`}
                  >
                    <option value="">Select Country</option>
                    <option value="pk">Pakistan</option>
                    <option value="usa">United States</option>
                  </select>

                  <div className="flex gap-4 items-center justify-center">
                    <div className="w-1/2">
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:outline-none ${errors.city ? 'border-red-500' : 'border'
                          }`}
                      >
                        <option value="">Select City</option>
                        <option value="lhr">Lahore</option>
                        <option value="mlt">Multan</option>
                      </select>
                    </div>
                    <div className="w-1/2">
                      <input
                        type="text"
                        placeholder="Postal Code (Optional)"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <h2 className="text-3xl font-extrabold text-gray-800">Shipping Method</h2>
                <p className="text-gray-800 text-sm mt-4">Select Your Shipping Method To Place The Order</p>
                <div className="flex mt-5 items-center justify-center">
                  <div className="w-11/12">
                    <select
                      name="shippingMethod"
                      value={formData.shippingMethod}
                      onChange={handleChange}
                      className="px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:outline-none"
                    >
                      <option value={formData.shippingMethod.toLowerCase()}>{formData.shippingMethod.toUpperCase()}</option>
                    </select>
                  </div>
                  <p className="pl-4 mb-0 text-xl font-bold">${cod}</p>
                </div>

                <h2 className="text-3xl mt-6 font-extrabold text-gray-800">Payment Method</h2>
                <p className="text-gray-800 text-sm mt-4">Select Your Payment Method To Place The Order</p>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="px-4 mt-5 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:outline-none"
                >
                  <option value="cod">Cash On Delivery (COD)</option>
                  <option value="stripe">Stripe</option>
                </select>
              </div>

              <div className="bg-gray-100 p-6 rounded-md">
                <h2 className="text-3xl font-extrabold text-gray-800">${getCartTotal() > 0 ? getCartTotal() : 0}</h2>
                <ul className="text-gray-800 mt-6 space-y-3">
                  <li className="flex flex-wrap gap-4 text-sm">Total <span className="ml-auto font-bold">${getCartTotal() > 0 ? getCartTotal() : 0}</span></li>
                  <li className="flex flex-wrap gap-4 text-sm">Delivery Charges <span className="ml-auto font-bold">${cod}</span></li>
                  <li className="flex flex-wrap gap-4 text-sm">Tax <span className="ml-auto font-bold">{taxPercent}%</span></li>
                  <li className="flex flex-wrap gap-4 text-sm font-bold border-t-2 pt-4">Total <span className="ml-auto">${totalBill}</span></li>
                </ul>
              </div>

              <button
                type="submit"
                className="mt-3 ml-auto mr-0 bg-red-500 w-full hover:bg-red-600 px-5 py-3 rounded-md font-semibold text-sm text-white capitalize"
              >
                Complete Order
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
