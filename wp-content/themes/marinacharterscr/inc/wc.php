<?php

// soporte para woocommerce del template
function woocommerce_support()
{
    add_theme_support('woocommerce');
}
add_action('after_setup_theme', 'woocommerce_support');


//quitamos el sidebar de woocomerce
remove_action('woocommerce_sidebar', 'woocommerce_get_sidebar', 10);

//quitamos el related products
remove_action('woocommerce_after_single_product_summary', 'woocommerce_output_related_products', 20);

//quitamos los tabs
remove_action('woocommerce_after_single_product_summary', 'woocommerce_output_product_data_tabs', 10);

//quitamos titulo de summary
remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_title', 5);

//quitamos precio de summary
//remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_price', 10);

//quitamos short description
remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_excerpt', 20);

//quitamos el titulo description del tab description
// add_filter(
//     'woocommerce_product_description_heading',
//     'marinacharterscr_product_description_heading'
// );

// function marinacharterscr_product_description_heading()
// {
//     return '';
// }

function marinacharterscr_redirect_checkout_add_cart($url)
{
    $url = get_permalink(get_option('woocommerce_checkout_page_id'));
    return $url;
}

add_filter('woocommerce_add_to_cart_redirect', 'marinacharterscr_redirect_checkout_add_cart');


add_filter('woocommerce_checkout_fields', 'custom_override_checkout_fields');

// Our hooked in function - $fields is passed via the filter!
function custom_override_checkout_fields($fields)
{
    unset($fields['billing']['billing_address_1']);
    unset($fields['billing']['billing_address_2']);
    unset($fields['billing']['billing_country']);
    unset($fields['billing']['billing_city']);
    unset($fields['billing']['billing_postcode']);
    unset($fields['billing']['billing_state']);
    unset($fields['billing']['billing_company']);

    //$fields['order']['order_comments']['placeholder'] = 'e.g. child seats';
    $fields['order']['order_comments']['label'] = 'Important Notes';


    return $fields;
}



