export const PER_PAGE = 12;

export const SORT_VALUES = ["newest", "price-asc", "price-desc", "name-asc"] as const;

export const DEFAULT_SORT = SORT_VALUES[0];

export const CART_STORAGE_KEY = "kenakata-cart";

export const MAX_CART_QUANTITY = 20;

export const SHIPPING_FEE = 5;
export const FREE_SHIPPING_THRESHOLD = 100;

export const PAYMENT_METHODS = ["cod", "card"] as const;

export const DECLINED_TEST_CARD_LAST4 = "0002";
export const MOCK_PAYMENT_DELAY_MS = 1500;

export const ACCESS_TOKEN_COOKIE = "access_token";
export const REFRESH_TOKEN_COOKIE = "refresh_token";

export const ACCESS_TOKEN_MAX_AGE = 60 * 60 * 24 * 20; // 20 days
export const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 10;     // 10 hours

export const DEFAULT_AVATAR = "https://i.pravatar.cc/300";