import { useRef, useCallback } from "react";
import type BottomSheet from "@gorhom/bottom-sheet";

export function useBottomSheet() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const onOpen = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const onClose = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const onToggle = useCallback(() => {
    // se estiver aberto, fecha. se estiver fechado, abre.
    const index = bottomSheetRef.current?.expand ?? -1;
    if (index === -1) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, []);

  return { bottomSheetRef, onOpen, onClose, onToggle };
}
