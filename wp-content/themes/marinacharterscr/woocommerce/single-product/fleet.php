<?php
/**
 * Fleet
 *
 *
 */

defined( 'ABSPATH' ) || exit;

global $product;

?>

 <h2 class="tour-title animated fadeIn">Fleet</h2>
                <hr class="animated fadeInUp">
              <!-- <div class="fleet-container flex-container-sb">
                <a href="#" class="fleet-item"><img src="./img/bote1.jpg"></a>
                <a href="#" class="fleet-item"><img src="./img/bote2.jpg"></a>
                <a href="#" class="fleet-item"><img src="./img/bote3.jpg"></a>
              </div> -->
              <div class="fleet-container animated fadeIn delay-1s">

                <div id="bl-main" class="bl-main">
                    <?php  $boats_ids = rwmb_meta( 'rw_boat' );
                    foreach ($boats_ids as $boat_id ) :

                        $id = get_post_thumbnail_id($boat_id);
                        $thumb_url = wp_get_attachment_image_src($id, 'boat-thumb', true);
                    
                    ?>
                      
                        <section id="bl-fleet-section-<?= $boat_id ?>" class="bl-fleet-section" style="background-image: url('<?= $thumb_url[0] ?>')">
                            <div class="bl-box">
                              <h2 class="bl-icon bl-icon-works"><?php echo get_the_title($boat_id ) ?></h2>
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
                                            
                                          <li data-panel="panel-<?= $index ?>"><a href="<?= $image['full_url'] ?>" class="image-link"><img src="<?= $image['url'] ?>" /></a></li>
                                          
                                        <?php 
                                    } ?>
                                  </ul>
                                <?php endif; ?>
                            </div>
                            <span class="bl-icon bl-icon-close"><i class="fas fa-times"></i></span>
                          </section>
                    <?php endforeach; ?>

                     
                      
                </div>
                 
                
              </div>
              <div class="fleet-container-mobile">
                  <dl>
                  
                
                 <?php $boats_ids = rwmb_meta('rw_boat');
                foreach ($boats_ids as $boat_id) :

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
                                        
                                       <li data-panel="panel-<?= $index ?>"><a href="<?= $image['full_url'] ?>" class="image-link"><img src="<?= $image['url'] ?>" /></a></li>
                                       
                                    <?php 
                                  } ?>
                               </ul>
                            <?php endif; ?>
                     </dd>
                    
                <?php endforeach; ?>
                  </dl>
              </div>