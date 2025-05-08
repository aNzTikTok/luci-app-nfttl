include $(TOPDIR)/rules.mk

PKG_NAME:=luci-app-nfttl
PKG_VERSION:=1.0
PKG_RELEASE:=1

PKG_MAINTAINER:=Dotycat <support@dotycat.com>
PKG_LICENSE:=MIT

LUCI_TITLE:=TTL Control
LUCI_DESCRIPTION:=This LuCI app provides TTL packet rewriting functionality using nftables.
LUCI_DEPENDS:=+luci-base +nftables +luci-lib-nixio

PKG_BUILD_DIR:=$(BUILD_DIR)/$(PKG_NAME)

include $(INCLUDE_DIR)/package.mk

define Package/$(PKG_NAME)
	SECTION:=luci
	CATEGORY:=LuCI
	SUBMENU:=3. Applications
	TITLE:=$(LUCI_TITLE)
	PKGARCH:=all
	DEPENDS:=$(LUCI_DEPENDS)
endef

define Package/$(PKG_NAME)/description
	$(LUCI_DESCRIPTION)
endef

define Build/Compile
endef

# Files to install
define Package/$(PKG_NAME)/install
	$(CP) ./files/* $(1)/
endef

# Build the package
$(eval $(call BuildPackage,$(PKG_NAME)))
