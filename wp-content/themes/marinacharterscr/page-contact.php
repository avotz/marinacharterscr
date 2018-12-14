<?php

/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 * Template Name: Page Contact 
 * @package marinacharterscr
 */

get_header();
?>

	<div class="main">
    	<div class="inner">
			<div class="blog-container flex-container-sb">
				<div class="blog-info">
					<?php
					while ( have_posts() ) :
						the_post();

						get_template_part( 'template-parts/content', 'page' );

						// If comments are open or we have at least one comment, load up the comment template.
						if ( comments_open() || get_comments_number() ) :
							comments_template();
						endif;

					endwhile; // End of the loop.
					?>
				</div>
				<div class="blog-sidebar">
					<?php get_sidebar('contact'); ?>
				</div>
			</div>

		</div><!-- #main -->
	</div><!-- #primary -->

<?php
//get_sidebar();
get_footer();
