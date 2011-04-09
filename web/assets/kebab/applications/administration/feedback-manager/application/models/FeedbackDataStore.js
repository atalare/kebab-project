/**
 * FeedbackManager Application FeedbackDataStore
 *
 * @category    Kebab (kebab-reloaded)
 * @package     Applications
 * @namespace   KebabOS.applications.feedbackManager.application.layouts
 * @author      Yunus ÖZCAN <yuns.ozcan@lab2023.com>
 * @copyright   Copyright (c) 2010-2011 lab2023 - internet technologies TURKEY Inc. (http://www.lab2023.com)
 * @license     http://www.kebab-project.com/licensing
 */
KebabOS.applications.feedbackManager.application.models.FeedbackDataStore = Ext.extend(Kebab.library.ext.RESTfulBasicDataStore, {

    bootstrap: null,

    restAPI: BASE_URL + '/feedback/feedback-manager',

    readerFields:[
        {name: 'id', type:'integer'},
        {name: 'User', type:'object'},
        {name:'applicationName', type:'string', mapping: 'Application.name'},
        {name: 'description', type:'string'},
        {name: 'status', type:'string'},

    ]
});