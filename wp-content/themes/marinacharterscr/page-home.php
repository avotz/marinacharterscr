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
 *
 * @package marinacharterscr
 */

get_header();
?>

	<div id="fullpage">
        <div class="section section-home" id="section-home" style="background-image: url('<?php echo get_template_directory_uri(); ?>/img/banner1.jpg')">
             <div class="info animated">
             	<h2 class="entry-subtitle">A World-Class Sanctuary</h2>
             	<h3>for World Class Yachts</h3>
             </div>
             <div class="button animated">
             	
             	<a href="#snorkeling" class="activities-link"><span>View our Activities</span>
             		<span class="icon">
             			<i class="fas fa-angle-down animated infinite bounce"></i>
             			
             		</span>
             	</a>
             </div>
            

        </div>

		  <?php
        $args = array(
            'post_type' => 'product',
            'orderby' => array('menu_order' => 'ASC', 'title' => 'ASC'),
			'posts_per_page' => 10,
			'tax_query' => array(

				array(
					'taxonomy' => 'product_cat',
					'field' => 'slug',
					'terms' => 'activities',

				),


			)
            
        );


        $items = new WP_Query($args);

        if ($items->have_posts()) {
           while ($items->have_posts()) {
                    $items->the_post();

                    ?>
					 <?php if (has_post_thumbnail()) :

						$id = get_post_thumbnail_id($post->ID);
						$thumb_url = wp_get_attachment_image_src($id, 'item-banner', true);

					?>      
						 <div class="section section-<?= $post->post_name; ?>" id="section-<?= $post->post_name; ?>" style="background-image: url('<?php echo esc_url($thumb_url[0]) ?>">
						
					 <?php else: ?>
 						<div class="section section-<?= $post->post_name; ?>" id="section-<?= $post->post_name; ?>" style="background-image: url('<?php echo get_template_directory_uri(); ?>/img/default.jpg');">
					<?php endif; ?>
					
						
						<div class="info">
								<h2 class="entry-subtitle animated revealRight"><i class="icon-boat left"></i> <?php the_title() ?></h2>
								
								<p class="animated reveal"><?php the_excerpt() ?></p>
									<hr class="animated revealUp">
								<a href="<?php the_permalink() ?>" class="btn-success animated revealUp">Take the Tour</a>
								
						</div>
						<div class="button animated">
							
							<a href="#fishing" class="activities-link"><span>More Activities</span>
								<span class="icon">
									<i class="fas fa-angle-down animated infinite bounce"></i>
									
								</span>
							</a>
						</div>
					</div>
                  
            
                                
                    <?php

                    } 
               
                }


                ?>
       
       
         <!-- <div class="section section-fishing" id="section-fishing" style="background-image: url('<?php echo get_template_directory_uri(); ?>/img/fishing.jpg');">
             
              
	          <div class="info">
	                  <h2 class="entry-subtitle animated revealLeft">Fishing <i class="icon-boat right"></i></h2>
	                 
	                   <p class="animated reveal">Costa Rica has some of the best Sport Fishing in the world. Fishing for Sailfish, Marlin...</p>
	                    <hr class="animated revealUp">
	                   <a href="./tour.html" class="btn-success animated revealUp">Take the Tour</a>
	                
	          </div>
	          <div class="button animated">
             	
             	<a href="#family" class="activities-link"><span>More Activities</span>
             		<span class="icon">
             			<i class="fas fa-angle-down animated infinite bounce"></i>
             			
             		</span>
             	</a>
             </div>
        </div>
        <div class="section section-beach" id="section-beach" style="background-image: url('<?php echo get_template_directory_uri(); ?>/img/surf.jpg');">
             
              
	          <div class="info">
	                 <h2 class="entry-subtitle animated revealRight"><i class="icon-boat left"></i>Surfing</h2>
	                   <p class="animated reveal">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
	                   tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
	                   quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
	                   consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
	                   cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
	                   proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
	                 <hr class="animated revealUp">
	                   <a href="./tour.html" class="btn-success animated revealUp">Take the Tour</a>
	                
	          </div>
	           <div class="button animated">
             	
             	<a href="#beach" class="activities-link"><span>More Activities</span>
             		<span class="icon">
             			<i class="fas fa-angle-down animated infinite bounce"></i>
             			
             		</span>
             	</a>
             </div>
	          
        </div>
         <div class="section section-family" id="section-family" style="background-image: url('<?php echo get_template_directory_uri(); ?>/img/family.jpg');">
             
              
	          <div class="info">
	                 <h2 class="entry-subtitle animated revealLeft">Family Beach <i class="icon-boat right"></i></h2>
	                 
	                   <p class="animated reveal">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
	                   tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
	                   quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
	                   consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
	                   cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
	                   proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
	                   <hr class="animated revealUp">
	                   <a href="./tour.html" class="btn-success animated revealUp">Take the Tour</a>
	                
	          </div>
	         
        </div> -->
         
     
            

        
          
      </div>

<?php
//get_sidebar();
get_footer('home');
