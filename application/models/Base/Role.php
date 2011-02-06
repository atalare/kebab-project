<?php

/**
 * Model_Base_Role
 * 
 * This class has been auto-generated by the Doctrine ORM Framework
 * 
 * @property string $name
 * @property integer $inheritRole
 * @property Model_Role $InheritRole
 * @property Doctrine_Collection $Users
 * @property Doctrine_Collection $UserRole
 * @property Doctrine_Collection $Role
 * @property Doctrine_Collection $Permission
 * 
 * @package    ##PACKAGE##
 * @subpackage ##SUBPACKAGE##
 * @author     lab2023 - Dev. Team <info@lab2023.com>
 * @version    SVN: $Id: Builder.php 7490 2010-03-29 19:53:27Z jwage $
 */
abstract class Model_Base_Role extends Doctrine_Record
{
    public function setTableDefinition()
    {
        $this->setTableName('role');
        $this->hasColumn('name', 'string', 255, array(
             'type' => 'string',
             'unique' => true,
             'length' => '255',
             ));
        $this->hasColumn('inheritRole', 'integer', null, array(
             'type' => 'integer',
             ));

        $this->option('type', 'INNODB');
        $this->option('collate', 'utf8_bin');
        $this->option('charset', 'utf8');
    }

    public function setUp()
    {
        parent::setUp();
        $this->hasOne('Model_Role as InheritRole', array(
             'local' => 'inheritRole',
             'foreign' => 'id'));

        $this->hasMany('Model_User as Users', array(
             'refClass' => 'Model_UserRole',
             'local' => 'role_id',
             'foreign' => 'user_id'));

        $this->hasMany('Model_UserRole as UserRole', array(
             'local' => 'id',
             'foreign' => 'role_id'));

        $this->hasMany('Model_Role as Role', array(
             'local' => 'id',
             'foreign' => 'inheritRole'));

        $this->hasMany('Model_Permission as Permission', array(
             'local' => 'id',
             'foreign' => 'role_id'));
    }
}