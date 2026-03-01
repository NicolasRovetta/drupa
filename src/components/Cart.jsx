import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import CartItem from './CartItem';
import './Cart.css';

const STEPS = {
    CART: 0,
    SHIPPING: 1,
    PAYMENT: 2,
    CONFIRMATION: 3
};

const SHIPPING_OPTIONS = [
    { id: 'pickup', title: 'Retiro en Local', description: 'Torres , Luján(Bs.As)', price: 0 },
    { id: 'standard', title: 'Envío a Domicilio (Estándar)', description: '3 a 5 días hábiles', price: 2500 },
    { id: 'express', title: 'Envío Express', description: 'En el día (Solo Luján(Bs.As))', price: 4500 }
];

const PAYMENT_OPTIONS = [
    { id: 'transfer', title: 'Transferencia Bancaria', description: '10% de Descuento Especial', discount: 0.10 },
    { id: 'mercadopago', title: 'MercadoPago', description: 'Dinero en cuenta o tarjetas', discount: 0 },
    { id: 'card', title: 'Tarjeta de Crédito', description: 'Hasta 3 cuotas sin interés', discount: 0 }
];

const Cart = () => {
    const { cart, cartTotal, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    const [step, setStep] = useState(STEPS.CART);
    const [isProcessing, setIsProcessing] = useState(false);

    const [shippingDetails, setShippingDetails] = useState({
        methodId: 'standard',
        name: '',
        email: '',
        address: '',
        city: '',
        zip: ''
    });

    const [paymentMethodId, setPaymentMethodId] = useState('transfer');

    const handleCheckoutNext = () => setStep(prev => prev + 1);
    const handleCheckoutBack = () => setStep(prev => prev - 1);

    const handleConfirmOrder = () => {
        setIsProcessing(true);

        const phoneNumber = '5492323343383';

        // Construir mensaje
        let message = `¡Hola Drupa! Quiero realizar el siguiente pedido:\n\n`;
        message += `*PRODUCTOS:*\n`;
        cart.forEach(item => {
            const variantText = item.selectedVariant ? ` (${item.selectedVariant})` : '';
            message += `- ${item.quantity}x ${item.name}${variantText} ($${(item.price * item.quantity).toLocaleString('es-AR')})\n`;
        });

        const currentShipping = SHIPPING_OPTIONS.find(opt => opt.id === shippingDetails.methodId);
        const currentPayment = PAYMENT_OPTIONS.find(opt => opt.id === paymentMethodId);

        message += `\n*ENVÍO:*\n`;
        message += `Método: ${currentShipping?.title || ''}\n`;
        message += `Nombre: ${shippingDetails.name}\n`;
        message += `Email: ${shippingDetails.email}\n`;
        if (shippingDetails.methodId !== 'pickup') {
            message += `Dirección: ${shippingDetails.address}, ${shippingDetails.city} (CP: ${shippingDetails.zip})\n`;
        }

        message += `\n*PAGO:*\n`;
        message += `Método: ${currentPayment?.title || ''}\n`;

        message += `\n*TOTALES:*\n`;
        message += `Subtotal: $${cartTotal.toLocaleString('es-AR')}\n`;
        message += `Envío: $${shippingCost.toLocaleString('es-AR')}\n`;
        if (discountValue > 0) {
            message += `Descuento: -$${discountValue.toLocaleString('es-AR')}\n`;
        }
        message += `*Total a Pagar: $${finalTotal.toLocaleString('es-AR')}*\n`;

        const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        // Completar visualmente el proceso local
        clearCart();
        setIsProcessing(false);
        setStep(STEPS.CONFIRMATION);

        // Abrir WhatsApp en la misma pestaña usando href para evitar bloqueadores de popups
        // Agregamos un pequeño timeout para que react-router renderice el paso Confirmación primero
        setTimeout(() => {
            window.location.href = waLink;
        }, 300);
    };

    const handleShippingChange = (e) => {
        const { name, value } = e.target;
        setShippingDetails(prev => ({ ...prev, [name]: value }));
    };

    // Calculate totals based on selections
    const selectedShipping = SHIPPING_OPTIONS.find(opt => opt.id === shippingDetails.methodId);
    const shippingCost = selectedShipping ? selectedShipping.price : 0;

    const selectedPayment = PAYMENT_OPTIONS.find(opt => opt.id === paymentMethodId);
    const discountFactor = selectedPayment ? selectedPayment.discount : 0;

    const totalBeforeDiscount = cartTotal + shippingCost;
    const discountValue = cartTotal * discountFactor; // Descuento aplica solo sobre productos, no envío
    const finalTotal = totalBeforeDiscount - discountValue;


    if (cart.length === 0 && step !== STEPS.CONFIRMATION) {
        return (
            <div className="cart-empty-container">
                <div className="cart-empty-icon">🛒</div>
                <h2>Tu carrito está vacío</h2>
                <p>Parece que aún no has agregado productos a tu carrito. ¡Descubrí todo lo sano que tenemos para vos!</p>
                <button className="back-to-shop-btn" onClick={() => navigate('/products')}>
                    Explorar Productos
                </button>
            </div>
        );
    }

    // ==========================================
    // RENDER STEPS
    // ==========================================

    const renderStepper = () => (
        <div className="checkout-stepper">
            <div className={`step ${step >= STEPS.CART ? 'active' : ''}`}>1. Carrito</div>
            <div className="step-line"></div>
            <div className={`step ${step >= STEPS.SHIPPING ? 'active' : ''}`}>2. Envío</div>
            <div className="step-line"></div>
            <div className={`step ${step >= STEPS.PAYMENT ? 'active' : ''}`}>3. Pago</div>
        </div>
    );

    const renderCartStep = () => (
        <div className="cart-content fade-in">
            <div className="cart-items-list">
                {cart.map(item => (
                    <CartItem key={item.id || item._id} item={item} />
                ))}
            </div>

            <div className="cart-summary sticky">
                <h3>Resumen del Pedido</h3>
                <div className="summary-row"><span>Subtotal ({cart.length} items)</span><span>${cartTotal.toLocaleString('es-AR')}</span></div>
                <div className="summary-row"><span>Envío</span><span>A calcular en el próximo paso</span></div>
                <div className="summary-divider"></div>
                <div className="summary-row total"><span>Total Estimado</span><span>${cartTotal.toLocaleString('es-AR')}</span></div>

                <button className="checkout-btn" onClick={handleCheckoutNext}>Continuar con el Envío</button>
                <button className="continue-shopping-btn" onClick={() => navigate('/products')}>Seguir Comprando</button>
            </div>
        </div>
    );

    const renderShippingStep = () => (
        <div className="checkout-step-container fade-in">
            <div className="checkout-main">
                <div className="checkout-step-header">
                    <button className="back-btn" onClick={handleCheckoutBack}>← Volver al Carrito</button>
                    <h2>Opciones de Envío</h2>
                </div>

                <div className="options-grid">
                    {SHIPPING_OPTIONS.map(opt => (
                        <div
                            key={opt.id}
                            className={`selection-card ${shippingDetails.methodId === opt.id ? 'selected' : ''}`}
                            onClick={() => setShippingDetails(prev => ({ ...prev, methodId: opt.id }))}
                        >
                            <div className="card-radio">
                                <div className={`radio-inner ${shippingDetails.methodId === opt.id ? 'active' : ''}`}></div>
                            </div>
                            <div className="card-info">
                                <h4>{opt.title}</h4>
                                <p>{opt.description}</p>
                            </div>
                            <div className="card-price">
                                {opt.price === 0 ? 'Gratis' : `+$${opt.price.toLocaleString('es-AR')}`}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="shipping-form">
                    <h3>Datos de Contacto y Entrega</h3>
                    <div className="form-group">
                        <label>Nombre y Apellido</label>
                        <input type="text" name="name" value={shippingDetails.name} onChange={handleShippingChange} placeholder="Ingresa tu nombre completo" />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" value={shippingDetails.email} onChange={handleShippingChange} placeholder="tu@email.com" />
                    </div>

                    {shippingDetails.methodId !== 'pickup' && (
                        <>
                            <div className="form-group">
                                <label>Dirección (Calle, Altura, Depto)</label>
                                <input type="text" name="address" value={shippingDetails.address} onChange={handleShippingChange} placeholder="Ej: San Martín 123, 4B" />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Ciudad</label>
                                    <input type="text" name="city" value={shippingDetails.city} onChange={handleShippingChange} placeholder="Ej: Córdoba" />
                                </div>
                                <div className="form-group">
                                    <label>Código Postal</label>
                                    <input type="text" name="zip" value={shippingDetails.zip} onChange={handleShippingChange} placeholder="Ej: 5000" />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="cart-summary sticky">
                <h3>Resumen</h3>
                <div className="summary-row"><span>Subtotal en Productos</span><span>${cartTotal.toLocaleString('es-AR')}</span></div>
                <div className="summary-row">
                    <span>Costo de Envío</span>
                    <span>{shippingCost === 0 ? 'Gratis' : `$${shippingCost.toLocaleString('es-AR')}`}</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row total"><span>Total Parcial</span><span>${(cartTotal + shippingCost).toLocaleString('es-AR')}</span></div>

                <button
                    className="checkout-btn"
                    onClick={handleCheckoutNext}
                    disabled={!shippingDetails.name || !shippingDetails.email || (shippingDetails.methodId !== 'pickup' && (!shippingDetails.address || !shippingDetails.city))}
                >
                    Continuar al Pago
                </button>
            </div>
        </div>
    );

    const renderPaymentStep = () => (
        <div className="checkout-step-container fade-in">
            <div className="checkout-main">
                <div className="checkout-step-header">
                    <button className="back-btn" onClick={handleCheckoutBack}>← Volver a Envío</button>
                    <h2>Método de Pago</h2>
                </div>

                <div className="options-grid payment-options">
                    {PAYMENT_OPTIONS.map(opt => (
                        <div
                            key={opt.id}
                            className={`selection-card ${paymentMethodId === opt.id ? 'selected' : ''}`}
                            onClick={() => setPaymentMethodId(opt.id)}
                        >
                            <div className="card-radio">
                                <div className={`radio-inner ${paymentMethodId === opt.id ? 'active' : ''}`}></div>
                            </div>
                            <div className="card-info">
                                <h4>{opt.title}</h4>
                                <p>{opt.description}</p>
                            </div>
                            {opt.discount > 0 && (
                                <div className="discount-badge">-{opt.discount * 100}%</div>
                            )}
                        </div>
                    ))}
                </div>

                {paymentMethodId === 'card' && (
                    <div className="shipping-form mockup-card-form">
                        <h3>Datos de la Tarjeta</h3>
                        <p className="mockup-warning">Esto es un entorno de prueba. No ingreses datos reales.</p>
                        <div className="form-group">
                            <label>Número de Tarjeta</label>
                            <input type="text" placeholder="0000 0000 0000 0000" maxLength="19" />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Vencimiento</label>
                                <input type="text" placeholder="MM/YY" maxLength="5" />
                            </div>
                            <div className="form-group">
                                <label>CVC</label>
                                <input type="text" placeholder="123" maxLength="4" />
                            </div>
                        </div>
                    </div>
                )}

                {paymentMethodId === 'transfer' && (
                    <div className="shipping-form transfer-info">
                        <h3>Datos para Transferir</h3>
                        <p>Al confirmar tu pedido, te mostraremos nuestro alias o CBU para realizar el pago y aprovechar el 10% de descuento.</p>
                    </div>
                )}
            </div>

            <div className="cart-summary sticky">
                <h3>Confirmación Final</h3>
                <div className="summary-row"><span>Subtotal en Productos</span><span>${cartTotal.toLocaleString('es-AR')}</span></div>
                <div className="summary-row">
                    <span>{selectedShipping?.title || 'Envío'}</span>
                    <span>{shippingCost === 0 ? 'Gratis' : `$${shippingCost.toLocaleString('es-AR')}`}</span>
                </div>

                {discountValue > 0 && (
                    <div className="summary-row discount-row">
                        <span>Descuento (Transferencia)</span>
                        <span>- ${(discountValue).toLocaleString('es-AR')}</span>
                    </div>
                )}

                <div className="summary-divider"></div>
                <div className="summary-row total final-total">
                    <span>Total a Pagar</span>
                    <span>${finalTotal.toLocaleString('es-AR')}</span>
                </div>

                <button
                    className={`checkout-btn confirm-btn ${isProcessing ? 'processing' : ''}`}
                    onClick={handleConfirmOrder}
                    disabled={isProcessing}
                    style={{ backgroundColor: '#25D366', borderColor: '#25D366' }}
                >
                    {isProcessing ? 'Procesando...' : 'Pedir por WhatsApp'}
                </button>
            </div>
        </div>
    );

    const renderConfirmationStep = () => (
        <div className="confirmation-container fade-in">
            <div className="success-icon">✓</div>
            <h2>¡Gracias por tu compra, {shippingDetails.name.split(' ')[0]}!</h2>
            <p className="order-number">Tu número de orden es: <strong>#DRP-{Math.floor(100000 + Math.random() * 900000)}</strong></p>

            <div className="confirmation-details">
                <p>Tu orden ha sido generada y te hemos redirigido a WhatsApp para finalizar la atención.</p>
                <p>También enviamos un correo a <strong>{shippingDetails.email}</strong> con los detalles.</p>
                {paymentMethodId === 'transfer' && (
                    <div className="transfer-instructions">
                        <h3>Instrucciones para Transferencia</h3>
                        <p>Total a transferir: <strong>${finalTotal.toLocaleString('es-AR')}</strong> (10% OFF aplicado)</p>
                        <div className="bank-details">
                            <p><strong>Alias:</strong> drupa.tienda.mp</p>
                            <p><strong>CBU (MercadoPago):</strong> 000000310001234567890</p>
                            <p><strong>Titular:</strong> Drupa Tienda Saludable</p>
                        </div>
                        <p className="small-note">Recuerda enviarnos el comprobante por WhatsApp con tu número de orden.</p>
                    </div>
                )}
            </div>

            <button className="checkout-btn" onClick={() => navigate('/')}>Volver al Inicio</button>
        </div>
    );

    return (
        <section className="cart-section">
            <div className="cart-container">
                {step < STEPS.CONFIRMATION && <h2 className="cart-title">Finalizar Compra</h2>}

                {step < STEPS.CONFIRMATION && renderStepper()}

                {step === STEPS.CART && renderCartStep()}
                {step === STEPS.SHIPPING && renderShippingStep()}
                {step === STEPS.PAYMENT && renderPaymentStep()}
                {step === STEPS.CONFIRMATION && renderConfirmationStep()}
            </div>
        </section>
    );
};

export default Cart;
