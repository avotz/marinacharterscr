<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package marinacharterscr
 */

?>
<?php if(!is_woocommerce()) : ?>
<div class="partners">
    <div class="inner">
    
    <?php dynamic_sidebar('partners'); ?>
    </div>

</div>
<?php endif; ?>


<?php 

get_template_part('template-parts/activities-by-request');

wp_footer();

?>

</body>
</html>
