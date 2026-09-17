export const PER_PAGE = 12;

export const SORT_VALUES = ["newest", "price-asc", "price-desc", "name-asc"] as const;

export const DEFAULT_SORT = SORT_VALUES[0];

export const CART_STORAGE_KEY = "kenakata-cart";

export const CART_OWNER_KEY = "kenakata-cart-owner";

export const MAX_CART_QUANTITY = 20;

export const ORDER_HISTORY_STORAGE_KEY = "kenakata-orders";

export const SHIPPING_FEE = 5;
export const FREE_SHIPPING_THRESHOLD = 100;

export const PAYMENT_METHODS = ["cod", "card"] as const;

export const DECLINED_TEST_CARD_LAST4 = "0002";
export const MOCK_PAYMENT_DELAY_MS = 1500;

export const SESSION_COOKIE_NAME = "kenakata_session";

export const DEFAULT_AVATAR = "https://i.pravatar.cc/300";