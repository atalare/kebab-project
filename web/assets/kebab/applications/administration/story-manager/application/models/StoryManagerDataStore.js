/**
 * storyManager Application StoryDataStore class
 *
 * @category    Kebab (kebab-reloaded)
 * @package     Applications
 * @namespace   KebabOS.applications.storyManager.application.models
 * @author      Yunus ÖZCAN <yunus.ozcan@lab2023.com>
 * @copyright   Copyright (c) 2010-2011 lab2023 - internet technologies TURKEY Inc. (http://www.lab2023.com)
 * @license     http://www.kebab-project.com/licensing
 */
KebabOS.applications.storyManager.application.models.StoryManagerDataStore = Ext.extend(Kebab.library.ext.RESTfulBasicDataStore, {

    bootstrap: null,

    restAPI: BASE_URL + '/feedback/feedback-manager',

    readerFields:[
        {name: 'id', type:'integer'},
        {name: 'name', type:'string'},
        {name:'title', type:'string'},
        {name: 'description', type:'string'},
        {name: 'status', type:'string'}
    ]
});