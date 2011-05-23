/**
 * userManager Application UserGrid class
 *
 * @category    Kebab (kebab-reloaded)
 * @package     Applications
 * @namespace   KebabOS.applications.userManager.application.views
 * @author      Yunus ÖZCAN <yunus.ozcan@lab2023.com>
 * @copyright   Copyright (c) 2010-2011 lab2023 - internet technologies TURKEY Inc. (http://www.lab2023.com)
 * @license     http://www.kebab-project.com/cms/licensing
 */
KebabOS.applications.userManager.application.views.UserGrid = Ext.extend(Kebab.library.ext.ComplexEditorGridPanel, {

    // Application bootstrap
    bootstrap: null,

    initComponent: function() {

        // json data store
        this.dataStore = new KebabOS.applications.userManager.application.models.UserDataStore({
            bootstrap:this.bootstrap
        });

        this.extraTbarButtons = this.buildExtraTbarButtonsData();

        this.addEvents('roleSelected');

        KebabOS.applications.userManager.application.views.UserGrid.superclass.initComponent.apply(this, arguments);
    },

    listeners: {
        beforeRender: function() {
            if (this.extraTbarButtons) {
                this.buildExtraTbarButtons();
            }
        },

        afterRender: function() {
            this.store.load({params:{start:0, limit:25}});
            this.onDisableButtonGroup('export');
            this.onGetButton('add').setText('Invite User');
            this.onGetButton('add').setIconClass('icon-user-add');
            this.batchButton.toggle();
            this.getView().fitColumns();
        }
    },
    buildExtraTbarButtonsData: function() {

        return [
            {
                xtype: 'buttongroup',
                title: 'Extra',
                defaults: {
                    iconAlign: 'top',
                    scale: 'small',
                    width:50,
                    scope: this
                },
                items: [
                    {
                        text: 'See details',
                        tooltip: 'See the selected record(s) details',
                        iconCls: 'icon-application-view-detail',
                        handler: function() { // Records selected
                            var sm = this.getSelectionModel();
                            if (sm.getCount()) {
                                this.fireEvent('userSelected', sm.getSelections());
                            }
                        }
                    }
                ]
            }
        ];
    },

    buildColumns: function() {
        var statusData = [
            ['pending','Pending'],
            ['banned','Banned'],
            ['approved','Approved']
        ];
        this.editorComboBox = new Ext.form.ComboBox({
            typeAhead: true,
            triggerAction: 'all',
            forceSelection: true,
            lazyRender:false,
            mode: 'local',
            store:new Ext.data.ArrayStore({
                fields: ['id', 'title'],
                data: statusData
            }),
            valueField: 'id',
            displayField: 'title',
            hiddenName: 'status',
            scope:this,
            gridRenderer : function(combo) {
                return function(value, meta, record) {
                    var comboRecord = combo.findRecord(combo.valueField, value);
                    try {
                        var displayValue = record.data.title;
                        return comboRecord ?
                                comboRecord.get(combo.displayField) : displayValue
                    } catch (exception) {
                        combo.setValue(value);
                        return combo.getRawValue();
                    }
                }
            }
        });

        return [
            this.selectionModel,
            {
                header : 'ID',
                dataIndex :'id',
                align:'center',
                width:12
            }, {
                header : 'Full Name',
                dataIndex :'fullName',
                width:40
            },{
                header : 'User Name',
                dataIndex :'userName',
                width:40
            },{
                header   : 'Email',
                dataIndex: 'email',
                width:60
            },{
                header   : 'Status',
                dataIndex: 'status',
                editor:this.editorComboBox,
                renderer: this.editorComboBox.gridRenderer(this.editorComboBox),
                width:30
            },{
                header   : 'Active ?',
                dataIndex: 'active',
                xtype:'checkcolumn',
                width:20
            }
        ]
    }

});
