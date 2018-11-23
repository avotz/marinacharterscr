<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package marinacharterscr
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
    <link href="https://fonts.googleapis.com/css?family=Lato:300,400,900" rel="stylesheet">
	<script defer="" src="https://use.fontawesome.com/releases/v5.0.13/js/solid.js" integrity="sha384-tzzSw1/Vo+0N5UhStP3bvwWPq+uvzCMfrN1fEFe+xBmv1C/AtVX5K0uZtmcHitFZ" crossorigin="anonymous"></script>
	<script defer="" src="https://use.fontawesome.com/releases/v5.0.13/js/brands.js" integrity="sha384-G/XjSSGjG98ANkPn82CYar6ZFqo7iCeZwVZIbNWhAmvCF2l+9b5S21K4udM7TGNu" crossorigin="anonymous"></script>
	<script defer="" src="https://use.fontawesome.com/releases/v5.0.13/js/fontawesome.js" integrity="sha384-6OIrr52G08NpOFSZdxxz1xdNSndlD4vdcf/q2myIUVO0VsqaGHJsB0RaBE01VTOY" crossorigin="anonymous"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/js/vendor/modernizr.custom.js"></script>
     
	<?php wp_head(); ?>

	<script>
		FontAwesomeConfig = { searchPseudoElements: true };
	</script>
</head>

<body <?php body_class(); ?>>
<header class="header">
		<div class="inner">
			<a href="<?php echo esc_url(home_url('/')); ?>" class="header-logo animated">
				
				<img src="<?php echo get_template_directory_uri(); ?>/img/logo.png" alt="Green Life Tours">
			</a>

			<div class="header-right flex-container-sb animated">
             
                <div class="btn-menu">
                   <button id="header-btn-menu" class="nav-btn-menu">
                       <i class="nav-btn-menu-icon fas fa-bars"></i>
                   </button>
                </div>
              
            </div>
		</div>
	</header>
	<div class="nav-container">
		
        <?php
			wp_nav_menu(array(
				'theme_location' => 'nav-menu',
				'menu_id' => 'nav-menu',
				'container' => 'nav',
				'container_class' => 'nav-menu',
				'container_id' => '',
				'menu_class' => 'nav-menu-ul',
			));
			?>
         <div class="nav-social">
              <a href="#" target="_blank"><i class="fab fa-facebook"></i></a>
              <a href="#"><i class="fab fa-twitter"></i></a>
              <a href="#"><i class="fab fa-google-plus"></i></a>
              <a href="#"><i class="fab fa-youtube"></i></a>
            </div>
        
    </div>
