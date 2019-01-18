<?php
/**
 * Template part for displaying page content in page.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package marinacharterscr
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header">
		<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
	</header><!-- .entry-header -->

	<?php marinacharterscr_post_thumbnail(); ?>

	<div class="entry-content">
		<?php
		the_content();

		?>

		 <?php $images = rwmb_meta('rw_gallery', 'type=image&size=boat-thumb');

		if ($images) : ?>
            <div class="gallery-slider">
				<?php foreach ($images as $index => $image) : ?>
					<div class="gallery-slide" style="background-image: url('<?= $image['url'] ?>">
					
				    </div>
						
						
				<?php endforeach; ?>
				
				
			</div>
			
		<?php endif; ?>
	</div><!-- .entry-content -->

	
</article><!-- #post-<?php the_ID(); ?> -->
