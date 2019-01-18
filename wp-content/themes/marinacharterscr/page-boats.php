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
 * Template Name: Page Boats 
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

                     <!-- <h2 class="tour-title animated fadeIn">Fleet</h2>
                        <hr class="animated fadeInUp">
                   -->
                    <div class="fleet-container animated fadeIn delay-1s">

                        <div id="bl-main" class="bl-main allitems">

                                <?php
                                    $args = array(
                                        'post_type' => 'boat',
                                        'orderby' => array('menu_order' => 'ASC', 'title' => 'ASC'),
                                        'posts_per_page' => 20,
                                        

                                    );


                                    $items = new WP_Query($args);

                                    if ($items->have_posts()) :
                                        $height = 'allitems';
                                        if ($items->post_count > 4) {
                                           // $height = 'sixitems';
                                        }
                                        while ($items->have_posts()) :
                                            $items->the_post();
                                            $boat_id = $post->ID;
                                            $id = get_post_thumbnail_id($boat_id);
                                            $thumb_url = wp_get_attachment_image_src($id, 'boat-thumb', true);
                                            ?>

                                             <section id="bl-fleet-section-<?= $boat_id ?>" class="bl-fleet-section <?php echo $height ?>" style="background-image: url('<?= $thumb_url[0] ?>');" data-id="<?= $boat_id ?>" >
                                                <div class="bl-box">
                                                <h2 class="bl-icon bl-icon-works"><?php echo get_the_title($boat_id) ?></h2>
                                                </div>
                                                <div class="bl-content">
                                                <h2><?php echo get_the_title($boat_id); ?></h2>
                                                <?php 
                                                $content_post = get_post($boat_id);
                                                $content = $content_post->post_content;
                                                $content = apply_filters('the_content', $content);
                                                $content = str_replace(']]>', ']]&gt;', $content);
                                                echo $content;
                                                ?>
                                                <?php $images = rwmb_meta('rw_gallery', 'type=image&size=boat-thumb', $boat_id);

                                                if ($images) : ?>
                                                
                                                    <ul id="bl-fleet-items">
                                                    
                                                            <?php foreach ($images as $index => $image) {

                                                                ?>
                                                                
                                                            <li data-panel="panel-<?= $index ?>"><a href="<?= $image['full_url'] ?>" class="image-link-<?= $boat_id ?>"><img src="<?= $image['url'] ?>" /></a></li>
                                                            
                                                            <?php 
                                                        } ?>
                                                    </ul>
                                                    <?php endif; ?>
                                                </div>
                                                <span class="bl-icon bl-icon-close"><i class="fas fa-times"></i></span>
                                            </section>

                                       
                                            
                                            
                                                    
                                        <?php

                                        endwhile;

                                    endif;

                                ?>

                            
                        </div>
                        
                        
                    </div>
                    <div class="clear"></div>
                    <div class="fleet-container-mobile">
                        <dl>
                        
                       <?php
                        $args = array(
                            'post_type' => 'boat',
                            'orderby' => array('menu_order' => 'ASC', 'title' => 'ASC'),
                            'posts_per_page' => 20,


                        );


                        $items = new WP_Query($args);

                        if ($items->have_posts()) :
                            $height = 'allitems';
                            if ($items->post_count > 4) {
                                            // $height = 'sixitems';
                            }
                            while ($items->have_posts()) :
                                $items->the_post();
                                $boat_id = $post->ID;
                                $id = get_post_thumbnail_id($boat_id);
                                $thumb_url = wp_get_attachment_image_src($id, 'boat-thumb', true);

                            ?>
                            <dt><?php echo get_the_title($boat_id) ?></dt>
                            <dd> 
                                <?php echo get_the_content($boat_id) ?>

                                <?php $images = rwmb_meta('rw_gallery', 'type=image&size=boat-thumb', $boat_id);

                                if ($images) : ?>
                                
                                    <ul id="bl-fleet-items">
                                    
                                            <?php foreach ($images as $index => $image) {

                                                ?>
                                                
                                            <li data-panel="panel-<?= $index ?>"><a href="<?= $image['full_url'] ?>" class="image-link-<?= $boat_id ?>"><img src="<?= $image['url'] ?>" /></a></li>
                                            
                                            <?php 
                                        } ?>
                                    </ul>
                                    <?php endif; ?>
                            </dd>
                            
                        <?php endwhile;
                         endif; ?>
                        </dl>
                    </div>
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
