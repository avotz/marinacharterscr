<?php

function marinacharterscr_meta_box($meta_boxes)
{
    $prefix = 'rw_';

    $meta_boxes[] = array(
        'id' => 'additional',
        'title' => esc_html__('Additional Information', 'marinacharterscr'),
        'post_types' => array('boat','page'),
        'context' => 'advanced',
        'priority' => 'default',
        'autosave' => false,
        'fields' => array(
            array(
                'id' => $prefix . 'gallery',
                'name' => esc_html__('Gallery', 'marinacharterscr'),
                'type' => 'image_advanced',
                'image_size' => 'thumbnail'
            ),
           
        ),
    );

    $meta_boxes[] = array(
        'id' => 'additional',
        'title' => esc_html__('Additional Information', 'marinacharterscr'),
        'post_types' => array('product'),
        'context' => 'advanced',
        'priority' => 'default',
        'autosave' => false,
        'fields' => array(
            array(
                'name' => 'Select a boat',
                'id' => $prefix . 'boat',
                'type' => 'post',
                'multiple' => true,
    // Post type.
                'post_type' => 'boat',

    // Field type.
                'field_type' => 'checkbox_tree',

    // Placeholder, inherited from `select_advanced` field.
                'placeholder' => 'Select a Boat',

    // Query arguments. See https://codex.wordpress.org/Class_Reference/WP_Query
                'query_args' => array(
                    'post_status' => 'publish',
                    'posts_per_page' => -1,
                ),
            ),

        ),
    );


    return $meta_boxes;
}
add_filter('rwmb_meta_boxes', 'marinacharterscr_meta_box');