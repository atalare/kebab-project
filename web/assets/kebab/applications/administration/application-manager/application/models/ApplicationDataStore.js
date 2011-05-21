/**
 * applicationManager Application ApplicationDataStore class
 *
 * @category    Kebab (kebab-reloaded)
 * @package     Applications
 * @namespace   KebabOS.applications.applicationManager.application.models
 * @author      Yunus ÖZCAN <yunus.ozcan@lab2023.com>
 * @copyright   Copyright (c) 2010-2011 lab2023 - internet technologies TURKEY Inc. (http://www.lab2023.com)
 * @license     http://www.kebab-project.com/licensing
 */
KebabOS.applications.applicationManager.application.models.ApplicationDataStore = Ext.extend(Kebab.library.ext.RESTfulDataStore, {

    bootstrap: null,

    restAPI: Kebab.OS.generateUrl('kebab/application'),

    readerFields:[
        {name: 'id', type:'integer'},
        {name:'title', type:'string'},
        {name: 'description', type:'string'},
        {name: 'active', type:'boolean'}
    ]
});