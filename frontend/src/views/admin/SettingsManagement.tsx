import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Bell,
  Globe,
  Save,
  Settings,
  Shield,
  ShieldAlert,
} from "lucide-react";
import { useState } from "react";

interface ForumSettings {
  general: {
    forumName: string;
    forumDescription: string;
    maintenanceMode: boolean;
    registrationEnabled: boolean;
    maxPostsPerPage: number;
    maxCommentsPerPost: number;
  };
  moderation: {
    autoModeration: boolean;
    requirePostApproval: boolean;
    requireCommentApproval: boolean;
    maxReportsBeforeAction: number;
    autoBanThreshold: number;
    profanityFilter: boolean;
    spamProtection: boolean;
  };
  notifications: {
    emailNotifications: boolean;
    adminNotifications: boolean;
    reportNotifications: boolean;
    userRegistrationNotifications: boolean;
  };
  security: {
    sessionTimeout: number;
    maxLoginAttempts: number;
    requireEmailVerification: boolean;
    twoFactorAuth: boolean;
    passwordMinLength: number;
  };
  appearance: {
    theme: "light" | "dark" | "auto";
    primaryColor: string;
    logoUrl: string;
    faviconUrl: string;
  };
}

export default function SettingsManagement() {
  const [settings, setSettings] = useState<ForumSettings>({
    general: {
      forumName: "Блокчейн Форум",
      forumDescription: "Форум за обсъждане на блокчейн технологии и смарт контракти",
      maintenanceMode: false,
      registrationEnabled: true,
      maxPostsPerPage: 20,
      maxCommentsPerPost: 100
    },
    moderation: {
      autoModeration: true,
      requirePostApproval: false,
      requireCommentApproval: false,
      maxReportsBeforeAction: 3,
      autoBanThreshold: 5,
      profanityFilter: true,
      spamProtection: true
    },
    notifications: {
      emailNotifications: true,
      adminNotifications: true,
      reportNotifications: true,
      userRegistrationNotifications: false
    },
    security: {
      sessionTimeout: 24,
      maxLoginAttempts: 5,
      requireEmailVerification: true,
      twoFactorAuth: false,
      passwordMinLength: 8
    },
    appearance: {
      theme: "auto",
      primaryColor: "#ef4444",
      logoUrl: "/logo.png",
      faviconUrl: "/favicon.ico"
    }
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    // TODO: Implement save settings functionality
    console.log("Saving settings:", settings);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const updateSetting = (section: keyof ForumSettings, key: string, value: string | number | boolean) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="bg-transparent backdrop-blur-xl rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-300">Настройки на форума</h1>
          <p className="text-gray-400 mt-2">
            Управлявайте настройките на форума и системните конфигурации.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-primary">
          <Settings className="h-4 w-4" />
          <span>Настройки</span>
        </div>
      </div>


      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card className="bg-transparent backdrop-blur-2xl rounded-lg">
          <CardHeader>
            <CardTitle className="text-gray-300 flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Общи настройки
            </CardTitle>
            <CardDescription>
              Основни настройки на форума
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="forumName" className="text-gray-300">Име на форума</Label>
              <Input
                id="forumName"
                value={settings.general.forumName}
                onChange={(e) => updateSetting('general', 'forumName', e.target.value)}
                className="bg-transparent border-gray-600"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="forumDescription" className="text-gray-300">Описание</Label>
              <Textarea
                id="forumDescription"
                value={settings.general.forumDescription}
                onChange={(e) => updateSetting('general', 'forumDescription', e.target.value)}
                className="bg-transparent border-gray-600"
                rows={3}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-gray-300">Режим на поддръжка</Label>
                <p className="text-sm text-gray-400">Форумът ще бъде недостъпен за потребители</p>
              </div>
              <Switch
                checked={settings.general.maintenanceMode}
                onCheckedChange={(checked) => updateSetting('general', 'maintenanceMode', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-gray-300">Регистрация разрешена</Label>
                <p className="text-sm text-gray-400">Нови потребители могат да се регистрират</p>
              </div>
              <Switch
                checked={settings.general.registrationEnabled}
                onCheckedChange={(checked) => updateSetting('general', 'registrationEnabled', checked)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maxPostsPerPage" className="text-gray-300">Постове на страница</Label>
                <Input
                  id="maxPostsPerPage"
                  type="number"
                  value={settings.general.maxPostsPerPage}
                  onChange={(e) => updateSetting('general', 'maxPostsPerPage', parseInt(e.target.value))}
                  className="bg-transparent border-gray-600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxCommentsPerPost" className="text-gray-300">Коментари на пост</Label>
                <Input
                  id="maxCommentsPerPost"
                  type="number"
                  value={settings.general.maxCommentsPerPost}
                  onChange={(e) => updateSetting('general', 'maxCommentsPerPost', parseInt(e.target.value))}
                  className="bg-transparent border-gray-600"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Moderation Settings */}
        <Card className="bg-transparent backdrop-blur-2xl rounded-lg">
          <CardHeader>
            <CardTitle className="text-gray-300 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Настройки за модерация
            </CardTitle>
            <CardDescription>
              Контролирайте модерацията на съдържанието
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-gray-300">Автоматична модерация</Label>
                <p className="text-sm text-gray-400">Автоматично филтриране на съдържание</p>
              </div>
              <Switch
                checked={settings.moderation.autoModeration}
                onCheckedChange={(checked) => updateSetting('moderation', 'autoModeration', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-gray-300">Одобрение на постове</Label>
                <p className="text-sm text-gray-400">Постове изискват одобрение</p>
              </div>
              <Switch
                checked={settings.moderation.requirePostApproval}
                onCheckedChange={(checked) => updateSetting('moderation', 'requirePostApproval', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-gray-300">Филтър за нецензурни думи</Label>
                <p className="text-sm text-gray-400">Автоматично филтриране на нецензурни думи</p>
              </div>
              <Switch
                checked={settings.moderation.profanityFilter}
                onCheckedChange={(checked) => updateSetting('moderation', 'profanityFilter', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-gray-300">Защита от спам</Label>
                <p className="text-sm text-gray-400">Автоматично блокиране на спам</p>
              </div>
              <Switch
                checked={settings.moderation.spamProtection}
                onCheckedChange={(checked) => updateSetting('moderation', 'spamProtection', checked)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maxReportsBeforeAction" className="text-gray-300">Сигнали преди действие</Label>
                <Input
                  id="maxReportsBeforeAction"
                  type="number"
                  value={settings.moderation.maxReportsBeforeAction}
                  onChange={(e) => updateSetting('moderation', 'maxReportsBeforeAction', parseInt(e.target.value))}
                  className="bg-transparent border-gray-600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="autoBanThreshold" className="text-gray-300">Праг за автоматично спиране</Label>
                <Input
                  id="autoBanThreshold"
                  type="number"
                  value={settings.moderation.autoBanThreshold}
                  onChange={(e) => updateSetting('moderation', 'autoBanThreshold', parseInt(e.target.value))}
                  className="bg-transparent border-gray-600"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-transparent backdrop-blur-2xl rounded-lg">
          <CardHeader>
            <CardTitle className="text-gray-300 flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Настройки за известия
            </CardTitle>
            <CardDescription>
              Управлявайте известията на системата
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-gray-300">Имейл известия</Label>
                <p className="text-sm text-gray-400">Изпращане на имейл известия</p>
              </div>
              <Switch
                checked={settings.notifications.emailNotifications}
                onCheckedChange={(checked) => updateSetting('notifications', 'emailNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-gray-300">Админ известия</Label>
                <p className="text-sm text-gray-400">Известия за администратори</p>
              </div>
              <Switch
                checked={settings.notifications.adminNotifications}
                onCheckedChange={(checked) => updateSetting('notifications', 'adminNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-gray-300">Известия за сигнали</Label>
                <p className="text-sm text-gray-400">Известия при нови сигнали</p>
              </div>
              <Switch
                checked={settings.notifications.reportNotifications}
                onCheckedChange={(checked) => updateSetting('notifications', 'reportNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-gray-300">Известия за регистрации</Label>
                <p className="text-sm text-gray-400">Известия при нови регистрации</p>
              </div>
              <Switch
                checked={settings.notifications.userRegistrationNotifications}
                onCheckedChange={(checked) => updateSetting('notifications', 'userRegistrationNotifications', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-transparent backdrop-blur-2xl rounded-lg">
          <CardHeader>
            <CardTitle className="text-gray-300 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5" />
              Настройки за сигурност
            </CardTitle>
            <CardDescription>
              Конфигурирайте сигурността на системата
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-gray-300">Верификация на имейл</Label>
                <p className="text-sm text-gray-400">Изискване за верификация на имейл</p>
              </div>
              <Switch
                checked={settings.security.requireEmailVerification}
                onCheckedChange={(checked) => updateSetting('security', 'requireEmailVerification', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-gray-300">Двуфакторна автентикация</Label>
                <p className="text-sm text-gray-400">Изискване за 2FA</p>
              </div>
              <Switch
                checked={settings.security.twoFactorAuth}
                onCheckedChange={(checked) => updateSetting('security', 'twoFactorAuth', checked)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout" className="text-gray-300">Време за сесия (часове)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                  className="bg-transparent border-gray-600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxLoginAttempts" className="text-gray-300">Макс. опити за вход</Label>
                <Input
                  id="maxLoginAttempts"
                  type="number"
                  value={settings.security.maxLoginAttempts}
                  onChange={(e) => updateSetting('security', 'maxLoginAttempts', parseInt(e.target.value))}
                  className="bg-transparent border-gray-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="passwordMinLength" className="text-gray-300">Минимална дължина на парола</Label>
              <Input
                id="passwordMinLength"
                type="number"
                value={settings.security.passwordMinLength}
                onChange={(e) => updateSetting('security', 'passwordMinLength', parseInt(e.target.value))}
                className="bg-transparent border-gray-600"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSaveSettings}
          disabled={isSaving}
          className="bg-primary hover:bg-primary/90 text-gray-800"
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Запазване..." : "Запази настройките"}
        </Button>
      </div>
    </div>
  );
} 