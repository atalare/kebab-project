<?php

if (!defined('BASE_PATH'))
    exit('No direct script access allowed');
/**
 * Kebab Framework
 *
 * LICENSE
 *
 * This source file is subject to the  Dual Licensing Model that is bundled
 * with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://www.kebab-project.com/licensing
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to info@lab2023.com so we can send you a copy immediately.
 *
 * @category   Kebab (kebab-reloaded)
 * @package    Kebab_Controller
 * @subpackage Kebab_Controller_Plugin
 * @author	   lab2023 Dev Team
 * @copyright  Copyright (c) 2010-2011 lab2023 - internet technologies TURKEY Inc. (http://www.lab2023.com)
 * @license    http://www.kebab-project.com/licensing
 * @version    1.5.0
 */

/**
 * Kebab Controller Acl Plugin
 * This class ckeck kebab acl and resources automaticly

 * @category   Kebab (kebab-reloaded)
 * @package    Kebab_Controller
 * @subpackage Kebab_Controller_Plugin
 * @author	   lab2023 Dev Team
 * @copyright  Copyright (c) 2010-2011 lab2023 - internet technologies TURKEY Inc. (http://www.lab2023.com)
 * @license    http://www.kebab-project.com/licensing
 * @version    1.5.0
 */
class Kebab_Controller_Plugin_Acl extends Zend_Controller_Plugin_Abstract
{

    /**
     * Zend_Acl object variable
     * @var Zend_Acl
     */
    private $_acl;
    /**
     * Roles variable
     * @var array
     */
    private $_roles = array();

    /**
     * Overrided preDispatch Method
     * Kebab acl and resources checking here
     *
     * @param Zend_Controller_Request_Abstract $request
     */
    public function preDispatch(Zend_Controller_Request_Abstract $request)
    {
        $auth = Zend_Auth::getInstance();
        if ($auth->hasIdentity()) {
            $identity = $auth->getIdentity();
            $this->_roles = $identity->roles;
            $this->_acl = $identity->acl;
        } else {
            //KBBTODO Don't like it' Hardcoding is bad!
            $this->_roles = array('guest');
            $this->_acl = new Kebab_Acl();
        }

        // Create mvcResource
        $module = ucfirst($request->getModuleName());
        $controller = ucfirst($request->getControllerName());
        $mvcResource = $module . '_' . $controller;
        $action = $request->getActionName();

        //Check Rules
        $isAllowed = FALSE;
        while (!$isAllowed && list(, $role) = each($this->_roles)) {
            $isAllowed = $this->_acl->isAllowed($role, $mvcResource, $action);
        }

        // Redirect default/auth/index
        if (!$isAllowed) {
            $request->setModuleName('default');
            $request->setControllerName('auth');
            $request->setActionName('index');
        }
    }

}