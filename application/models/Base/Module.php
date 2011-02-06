<?php

/**
 * Model_Base_Module
 * 
 * This class has been auto-generated by the Doctrine ORM Framework
 * 
 * @property string $name
 * @property Doctrine_Collection $Controllers
 * @property Doctrine_Collection $Controller
 * 
 * @package    ##PACKAGE##
 * @subpackage ##SUBPACKAGE##
 * @author     lab2023 - Dev. Team <info@lab2023.com>
 * @version    SVN: $Id: Builder.php 7490 2010-03-29 19:53:27Z jwage $
 */
abstract class Model_Base_Module extends Doctrine_Record
{
    public function setTableDefinition()
    {
        $this->setTableName('module');
        $this->hasColumn('name', 'string', 255, array(
             'type' => 'string',
             'unique' => true,
             'length' => '255',
             ));

        $this->option('type', 'INNODB');
        $this->option('collate', 'utf8_bin');
        $this->option('charset', 'utf8');
    }

    public function setUp()
    {
        parent::setUp();
        $this->hasMany('Model_Controller as Controllers', array(
             'local' => 'controller_id',
             'foreign' => 'id'));

        $this->hasMany('Model_Controller as Controller', array(
             'local' => 'id',
             'foreign' => 'module_id'));
    }
}