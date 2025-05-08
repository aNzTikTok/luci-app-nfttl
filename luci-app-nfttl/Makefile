include $(TOPDIR)/rules.mk

LUCI_TITLE:=TTL Control
LUCI_PKGARCH:=all
PKG_NAME:=luci-app-nfttl
PKG_VERSION:=1.0
PKG_RELEASE:=1

PKG_MAINTAINER:=Dotycat <support@dotycat.com>
PKG_LICENSE:=MIT

include $(INCLUDE_DIR)/package.mk

define Package/luci-app-nfttl
  SECTION:=luci
  CATEGORY:=LuCI
  DEPENDS:=+luci-base +nftables +libnixio
  TITLE:=TTL Control
  URL:=https://github.com/aNzTikTok/luci-app-nfttl
endef

define Package/luci-app-nfttl/description
  A LuCI app for managing TTL settings via nftables on OpenWrt.
endef

define Build/Compile
endef

define Package/luci-app-nfttl/install
  $(INSTALL_DIR) $(1)/usr/lib/lua/luci/controller
  $(INSTALL_DATA) ./files/controller/nfttl.js $(1)/usr/lib/lua/luci/controller/nfttl.js

  $(INSTALL_DIR) $(1)/usr/lib/lua/luci/model/cbi/nfttl
  $(INSTALL_DATA) ./files/view/nfttl.js $(1)/usr/lib/lua/luci/model/cbi/nfttl/nfttl.js

  $(INSTALL_DIR) $(1)/etc/config
  $(INSTALL_CONF) ./files/nfttl $(1)/etc/config/nfttl
endef

$(eval $(call BuildPackage,luci-app-nfttl))
